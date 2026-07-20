# PrismConsensus

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:46.069664Z
**Run ID**: RUN-027
**Seed**: 1700000027

---

## Architecture

- Architecture: ring_based
- Node Type: uniform
- Quorum Type: hierarchical

## Leader Election

- Method: term_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: flexible_quorum
- Vote Granting: grant_to_candidate
- Vote Revocations: False

## Log Replication

- Type: replicated_log
- Structure: ring_buffer
- Commit Method: majority_commit

## Recovery

- Strategy: log_catchup
- Snapshot Policy: periodic

## Membership

- Model: remove_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: swim_like
- Model: crash_stop

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 69ms
- Election Timeout Base: 405ms
- Election Timeout Range: 258ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- leader_announce
- term_update

## State Machine

- Type: simple_state
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:term_based
- concept:term_epochs
- concept:randomized_timeout
- voting:flexible_quorum
- vote_granting:grant_to_candidate
- log:replicated_log
- log_structure:ring_buffer
- commit:majority_commit
- recovery:log_catchup
- snapshot:periodic
- dynamic_membership:remove_node
- failure_detection:swim_like

---

## Simulation Results

### 3 Nodes

- Election Attempts: 64
- Elections Succeeded: 56
- Election Success Rate: 87.50%
- Messages Sent: 194
- Commits: 11
- Avg Messages/Commit: 17.64
- Leader Changes: 56
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 73
- Elections Succeeded: 68
- Election Success Rate: 93.15%
- Messages Sent: 426
- Commits: 37
- Avg Messages/Commit: 11.51
- Leader Changes: 68
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 46
- Elections Succeeded: 45
- Election Success Rate: 97.83%
- Messages Sent: 406
- Commits: 20
- Avg Messages/Commit: 20.30
- Leader Changes: 45
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 48
- Elections Succeeded: 47
- Election Success Rate: 97.92%
- Messages Sent: 504
- Commits: 26
- Avg Messages/Commit: 19.38
- Leader Changes: 47
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

