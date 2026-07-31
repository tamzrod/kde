# StratumCore

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:49.213677Z
**Run ID**: RUN-087
**Seed**: 1700000087

---

## Architecture

- Architecture: hierarchical
- Node Type: uniform
- Quorum Type: weighted

## Leader Election

- Method: load_balanced
- Term/Epochs: False
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: flexible_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: False

## Log Replication

- Type: replicated_log
- Structure: hash_chain
- Commit Method: batch_commit

## Recovery

- Strategy: state_transfer
- Snapshot Policy: size_based

## Membership

- Model: remove_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: gossip
- Model: timing

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 485ms
- Election Timeout Base: 409ms
- Election Timeout Range: 295ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- term_update

## State Machine

- Type: simple_state
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:load_balanced
- voting:flexible_quorum
- vote_granting:grant_to_highest_term
- log:replicated_log
- log_structure:hash_chain
- commit:batch_commit
- recovery:state_transfer
- snapshot:size_based
- dynamic_membership:remove_node
- failure_detection:gossip

---

## Simulation Results

### 3 Nodes

- Election Attempts: 58
- Elections Succeeded: 53
- Election Success Rate: 91.38%
- Messages Sent: 194
- Commits: 29
- Avg Messages/Commit: 6.69
- Leader Changes: 53
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 46
- Elections Succeeded: 40
- Election Success Rate: 86.96%
- Messages Sent: 214
- Commits: 12
- Avg Messages/Commit: 17.83
- Leader Changes: 40
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 47
- Elections Succeeded: 47
- Election Success Rate: 100.00%
- Messages Sent: 386
- Commits: 15
- Avg Messages/Commit: 25.73
- Leader Changes: 47
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 44
- Elections Succeeded: 44
- Election Success Rate: 100.00%
- Messages Sent: 607
- Commits: 26
- Avg Messages/Commit: 23.35
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

