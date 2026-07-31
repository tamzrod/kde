# HelixConsensus

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.236768Z
**Run ID**: RUN-049
**Seed**: 1700000049

---

## Architecture

- Architecture: decentralized
- Node Type: heterogeneous
- Quorum Type: flexible

## Leader Election

- Method: term_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: read_quorum
- Vote Granting: grant_based_on_priority
- Vote Revocations: False

## Log Replication

- Type: replicated_log
- Structure: hash_chain
- Commit Method: quorum_commit

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: log_compaction

## Membership

- Model: remove_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: heartbeat
- Model: omission

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 146ms
- Election Timeout Base: 253ms
- Election Timeout Range: 245ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- leader_announce
- term_update

## State Machine

- Type: deterministic
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:term_based
- concept:term_epochs
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:read_quorum
- vote_granting:grant_based_on_priority
- log:replicated_log
- log_structure:hash_chain
- commit:quorum_commit
- recovery:incremental_snapshot
- snapshot:log_compaction
- dynamic_membership:remove_node
- failure_detection:heartbeat
- concept:heartbeat

---

## Simulation Results

### 3 Nodes

- Election Attempts: 52
- Elections Succeeded: 41
- Election Success Rate: 78.85%
- Messages Sent: 153
- Commits: 22
- Avg Messages/Commit: 6.95
- Leader Changes: 41
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 58
- Elections Succeeded: 50
- Election Success Rate: 86.21%
- Messages Sent: 324
- Commits: 26
- Avg Messages/Commit: 12.46
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 75
- Elections Succeeded: 75
- Election Success Rate: 100.00%
- Messages Sent: 657
- Commits: 32
- Avg Messages/Commit: 20.53
- Leader Changes: 75
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 55
- Elections Succeeded: 48
- Election Success Rate: 87.27%
- Messages Sent: 450
- Commits: 22
- Avg Messages/Commit: 20.45
- Leader Changes: 48
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

